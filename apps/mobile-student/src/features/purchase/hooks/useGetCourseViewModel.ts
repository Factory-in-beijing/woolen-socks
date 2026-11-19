import { useCallback, useRef, useState } from "react";
import type { ComponentRef } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from "react-native";
import { useCourseOffer } from "@/data/courseOffer";
import { formatGel } from "@/lib/money";

/** How close (px) to the bottom counts as "payment is in view" and hides the scroll hint. */
const NEAR_END_PX = 160;

export function useGetCourseViewModel() {
  const offer = useCourseOffer();
  const [atEnd, setAtEnd] = useState(false);
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    setAtEnd(contentOffset.y + layoutMeasurement.height >= contentSize.height - NEAR_END_PX);
  }, []);

  const scrollToPayment = useCallback(() => scrollRef.current?.scrollToEnd({ animated: true }), []);

  return {
    scrollRef,
    scrollToPayment,
    price: formatGel(offer.price),
    hintOpacity: atEnd ? 0 : 1,
    hintOffsetY: atEnd ? 12 : 0,
    hintTouchable: !atEnd,
    onScroll,
  };
}
