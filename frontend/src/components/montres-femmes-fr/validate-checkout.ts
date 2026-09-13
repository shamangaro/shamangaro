import { isValidMoroccanPhone } from "@/lib/phone";
import type { SelectedWatchLine } from "@/components/montres-femmes/watch-selection-utils";
import { countSelectedWatches } from "@/components/montres-femmes/watch-selection-utils";
import type {
  WatchesFormErrors,
  WatchesFormValues,
} from "@/components/montres-femmes/watches-validation";
import { FR_COPY } from "./copy";

export function validateFrenchWatchesCheckout(
  selectedLines: SelectedWatchLine[],
  checkoutUnlocked: boolean,
  form: WatchesFormValues
): WatchesFormErrors {
  const errors: WatchesFormErrors = {};
  const selectedCount = countSelectedWatches(selectedLines);

  if (!checkoutUnlocked || selectedCount < 1) {
    errors.selection = FR_COPY.validation.selection;
  }
  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = FR_COPY.validation.name;
  }
  if (!isValidMoroccanPhone(form.phone)) {
    errors.phone = FR_COPY.validation.phone;
  }
  if (!form.city.trim()) errors.city = FR_COPY.validation.city;

  return errors;
}
