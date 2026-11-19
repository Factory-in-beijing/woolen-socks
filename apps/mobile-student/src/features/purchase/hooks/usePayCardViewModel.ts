import { useState } from "react";
import { fieldFocus } from "@/theme/fieldFocus";
import { useCourseOffer } from "@/data/courseOffer";
import {
  CARD_NUMBER_LENGTH,
  CARD_CVC_LENGTH,
  CARD_EXPIRY_LENGTH,
  cardBrand,
  cleanCardName,
  digitsOnly,
  formatCardNumber,
  formatExpiryField,
  formatExpiryPreview,
  isCardFormComplete,
} from "../domain/card";

type Field = "num" | "exp" | "cvc" | "name";

const PREVIEW_HIGHLIGHT = "rgba(255,255,255,0.16)";
const GROUP_GAP = 12;
const DIGIT_GAP = 2;
const display = (visible: boolean) => (visible ? ("flex" as const) : ("none" as const));

/** Card form state: formatted values for the inputs and the live card preview. Card data lives only in this component's memory. */
export function usePayCardViewModel() {
  const offer = useCourseOffer();
  const [num, setNum] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [focus, setFocus] = useState<Field>("num");
  const [save, setSave] = useState(true);

  const brand = cardBrand(num);
  const complete = isCardFormComplete({ number: num, expiry: exp, cvc, name });
  const hasName = name.trim().length > 0;
  const focusOf = (field: Field) => fieldFocus(focus === field);
  const brandIcons = {
    visa: display(brand === "visa"),
    mc: display(brand === "mc"),
    generic: display(brand === "generic"),
  };

  return {
    price: offer.price,
    complete,
    // preview card
    slots: Array.from({ length: CARD_NUMBER_LENGTH }, (_, i) => ({
      filled: Boolean(num[i]),
      empty: !num[i],
      ch: num[i] ?? "",
      gap: i % 4 === 3 && i < CARD_NUMBER_LENGTH - 1 ? GROUP_GAP : DIGIT_GAP,
    })),
    pvName: hasName ? name.toUpperCase() : "YOUR NAME",
    pvNameOpacity: hasName ? 1 : 0.45,
    pvExp: formatExpiryPreview(exp),
    pvExpOpacity: exp ? 1 : 0.45,
    pvNumBg: focus === "num" ? PREVIEW_HIGHLIGHT : "transparent",
    pvNameBg: focus === "name" ? PREVIEW_HIGHLIGHT : "transparent",
    pvExpBg: focus === "exp" || focus === "cvc" ? PREVIEW_HIGHLIGHT : "transparent",
    cVisa: brandIcons.visa,
    cMc: brandIcons.mc,
    cGen: brandIcons.generic,
    fVisa: brandIcons.visa,
    fMc: brandIcons.mc,
    fGen: brandIcons.generic,
    // inputs
    numVal: formatCardNumber(num),
    expVal: formatExpiryField(exp),
    cvcVal: cvc,
    nameVal: name,
    numSet: (value: string) => setNum(digitsOnly(value, CARD_NUMBER_LENGTH)),
    expSet: (value: string) => setExp(digitsOnly(value, CARD_EXPIRY_LENGTH)),
    cvcSet: (value: string) => setCvc(digitsOnly(value, CARD_CVC_LENGTH)),
    nameSet: (value: string) => setName(cleanCardName(value)),
    numFocus: () => setFocus("num"),
    expFocus: () => setFocus("exp"),
    cvcFocus: () => setFocus("cvc"),
    nameFocus: () => setFocus("name"),
    numBorder: focusOf("num").border,
    numRing: focusOf("num").ring,
    numLabel: focusOf("num").label,
    expBorder: focusOf("exp").border,
    expRing: focusOf("exp").ring,
    expLabel: focusOf("exp").label,
    cvcBorder: focusOf("cvc").border,
    cvcRing: focusOf("cvc").ring,
    cvcLabel: focusOf("cvc").label,
    nameBorder: focusOf("name").border,
    nameRing: focusOf("name").ring,
    nameLabel: focusOf("name").label,
    // save-card switch and pay button
    saveTrack: save ? "#0E1C91" : "#D5DAEE",
    saveJustify: save ? ("flex-end" as const) : ("flex-start" as const),
    saveTap: () => setSave((value) => !value),
    payOpacity: complete ? 1 : 0.55,
  };
}
