import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReportModal {
  user: boolean;
  board: boolean;
}

interface Popup {
  view: boolean;
  textContents: string;
}
interface InitialState {
  popup: Popup;
  reportModal: ReportModal;
  modalProfile: boolean;
}

const initialState: InitialState = {
  popup: { view: false, textContents: '' },
  reportModal: { user: false, board: false },
  modalProfile: false,
};
const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    handleModalState(state, action: PayloadAction<'modalProfile'>) {
      state[action.payload] = !state[action.payload];
    },
    handelReportModal(
      state,
      action: PayloadAction<keyof ReportModal | undefined>,
    ) {
      if (action.payload)
        state.reportModal[action.payload] = !state.reportModal[action.payload];
      else {
        state.reportModal.board = false;
        state.reportModal.user = false;
      }
    },
    handlePopup(state, action: PayloadAction<string>) {
      state.popup.view = !state.popup.view;
      state.popup.textContents = action.payload;
    },
  },
});

export const { handleModalState, handelReportModal, handlePopup } =
  modal.actions;
export default modal.reducer;
