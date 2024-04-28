import {useEffect, useMemo, useRef, useState} from 'react';
// @ts-ignore
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
  Pressable,
  findNodeHandle,
  AccessibilityInfo,
  StyleSheet,
  Dimensions,
} from 'react-native';

export interface IBottomSheetProps {
  onClose?: () => void;
  onClickOkButton?: () => void;
  isVisible: boolean;
  title?: string;
  renderItem?: any;
  crossIcon?: boolean;
  modalProps?: any;
  showOkButton?: any;
  showHeader?: any;
  headerProps?: any;
  headerElements?: any;
  isTopInput?: boolean;
  toastSuccess?: boolean;
  toastMessage?: any;
  toastError?: boolean;
}

const BottomSheet = ({
  onClose = () => {},
  isVisible,
  title,
  renderItem,
  crossIcon,
  showHeader,
  modalProps,
  headerProps,
  headerElements,
}: IBottomSheetProps) => {
  const bottomSheetRef = useRef(null);

  const props = useMemo(() => {
    if (modalProps) {
      return modalProps;
    }
    return {gap: 0};
  }, [modalProps]);

  const [modalPosition, setModalPosition] = useState(0);

  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClose = () => {
    onClose();
    if (buttonClicked) {
      onClose();
    }
  };

  return (
    <View>
      <Modal
        accessibilityViewIsModal
        statusBarTranslucent // property added so that status bar will also be grayedout
        visible={isVisible}
        transparent
        accessible
        animationType="fade"
        onRequestClose={() => onClose()}>
        <KeyboardAvoidingView
          style={styles.modalMainContainer}
          behavior={'padding'}>
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View
                  accessible={true}
                  testID="modal-render-item-view"
                  style={[styles.modal, {...props}]}>
                  {(showHeader || crossIcon) && (
                    <View style={styles.bsHeader}>
                      {showHeader ? (
                        <View style={[styles.flex, {...headerProps}]}>
                          {title ? (
                            <Text style={styles.title}>{title}</Text>
                          ) : (
                            <></>
                          )}
                          {headerElements ? headerElements : <></>}
                        </View>
                      ) : (
                        <></>
                      )}
                      {crossIcon && (
                        <Pressable
                          onPress={onClose}
                          style={{
                            width: 28,
                            height: 28,
                          }}>
                          <Text style={styles.title}>X</Text>
                        </Pressable>
                      )}
                      {headerElements ? headerElements : <></>}
                    </View>
                  )}
                  {renderItem?.()}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export const styles = StyleSheet.create({
  scrollviewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  modal: {
    position: 'absolute',
    height: 'auto',
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: 'white',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    width: '95%',
    fontSize: 20,
    color: 'black',
  },
  modalMainContainer: {
    flex: 1,
    height: Dimensions.get('window').height,
  },
});

export default BottomSheet;
