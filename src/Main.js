import React, {useRef, useMemo, useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Animated, {FadeInUp, FadeInLeft} from 'react-native-reanimated';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

export default function Main() {
  const ref = useRef();
  const snapPoints = useMemo(() => ['50%'], []);
  const [bottomSheetState, setBottomSheetState] = useState('closed');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (bottomSheetState === 'opened') {
          ref.current?.close();
          return true;
        }
      },
    );

    return () => backHandler.remove();
  }, [bottomSheetState, ref]);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    if (index === -1) {
      setBottomSheetState('closed');
    } else {
      setBottomSheetState('opened');
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* remove animated components will remove the flicker of bottomsheet with onChange callback */}
      <Animated.View entering={FadeInLeft.duration(300)} style={styles.circle}>
        <Animated.Text entering={FadeInUp.delay(300)} style={styles.header}>
          Hello
        </Animated.Text>
      </Animated.View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => ref.current.snapToIndex(0)}>
        <Text style={styles.buttonText}>Open Bottom Sheet</Text>
      </TouchableOpacity>

      {/* remove onChange prop will remove the flicker without removing animated components */}
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        index={-1}
        animateOnMount
        onChange={handleSheetChanges}
        backdropComponent={props => (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            {...props}
            pressBehavior="close"
          />
        )}>
        <View style={styles.bottomSheetContainer}>
          <Text>Hello</Text>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
  },
  circle: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    marginTop: 100,
    padding: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
