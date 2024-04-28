import {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsersService} from '../store/services';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import UserDetailsBS from '../components/UserDetailsBS/UserDetailsBS';
import {CreateOneButtonAlert} from '../components/OneButtonAlert/OneButtonAlert';
import {isWithinRegion} from '../utils/mapUtils';
import {mapStyle} from '../utils/mapStyles';
import ImageMarker from '../components/ImageMarker/ImageMarker';
import UserAvatar from '../components/UserAvatar/UserAvatar';

export interface User {
  id: number;
  name: string;
  pfp: string;
  location: {
    lat: number;
    long: number;
    city: string;
  };
}

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 88.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 90.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default () => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const bottomInset = insets.bottom;
  const dispatch = useDispatch();
  const usersData = useSelector((state: any) => state.user.users.data);
  const mapRef = useRef(null);

  const [userDataBSOpen, setUserDataBSOpen] = useState(false);
  const [outboundUsers, setOutboundUsers] = useState([]);
  const [userDataInView, setUserDataInView] = useState<User | null>({
    id: 0,
    name: '',
    pfp: '',
    location: {
      lat: 0,
      long: 0,
      city: '',
    },
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // fetches user data from a given endpoint
  const fetchUsers = async () => {
    const response = await dispatch(fetchUsersService());
  };

  // This function is called on click of user avatars in below pane.
  // It changes the current region to a new one specified in arguments
  const changeRegion = (latitude: number, longitude: number) => {
    const newRegion = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: LATITUDE_DELTA / 2,
      longitudeDelta: LONGITUDE_DELTA / 2,
    };
    //@ts-expect-error
    mapRef.current.animateToRegion(newRegion, 1000);
  };

  // This function computes which user is currently not in the view of the screen
  // to show such users in below pane
  const handleOnRegionChangeComplete = (newRegion: any) => {
    const outOfBoundUsers = usersData?.filter((user: any) => {
      const isInside = isWithinRegion(
        {
          latitude: user.location.lat,
          longitude: user.location.long,
        },
        {
          latitude: newRegion.latitude,
          longitude: newRegion.longitude,
        },
        (newRegion.latitudeDelta - 1) * ASPECT_RATIO,
        (newRegion.longitudeDelta - 1) * ASPECT_RATIO,
      );
      if (isInside) {
        return false;
      } else {
        return true;
      }
    });
    setOutboundUsers(outOfBoundUsers);
  };

  return (
    <>
      <View
        style={{
          ...styles.container,
          height:
            Dimensions.get('window').height -
            statusBarHeight -
            bottomInset -
            56,
        }}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          customMapStyle={mapStyle}
          region={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          onRegionChangeComplete={handleOnRegionChangeComplete}
          ref={mapRef}>
          {usersData?.map((user: any) => {
            return (
              <View key={user.id}>
                <ImageMarker
                  user={user}
                  onPress={() => {
                    setUserDataInView(user);
                    setUserDataBSOpen(true);
                  }}
                  userInView={userDataInView?.id === user.id}
                />
              </View>
            );
          })}
        </MapView>
        <View style={styles.outUsersContainer}>
          {outboundUsers?.slice(0, 6)?.map((user: any) => {
            return (
              <View style={{marginHorizontal: 4}} key={user.id}>
                <UserAvatar
                  user={user}
                  onPress={() => {
                    changeRegion(user.location.lat, user.location.long);
                    setUserDataInView(user);
                    setUserDataBSOpen(true);
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
      <BottomSheet
        onClose={() => {
          setUserDataBSOpen(false);
          setUserDataInView(null);
        }}
        isVisible={userDataBSOpen}
        title={'User'}
        renderItem={() => <UserDetailsBS user={userDataInView} />}
        crossIcon={true}
        showHeader={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  outUsersContainer: {
    position: 'absolute',
    bottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
