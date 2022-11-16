import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReportModal {
  user: boolean;
  board: boolean;
}

interface Popup {
  textContents: string;
  children: React.ReactNode;
  view: boolean;
}
interface InitialState {
  popup: Popup;
  reportModal: ReportModal;
  modalProfile: boolean;
}

const initialState: InitialState = {
  popup: { view: false, textContents: '', children: null },
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
    handlePopup(
      state,
      action: PayloadAction<
        { text: string; children: React.ReactNode } | undefined
      >,
    ) {
      if (action.payload) {
        state.popup = {
          children: action.payload.children,
          textContents: action.payload.text,
          view: true,
        };
      } else {
        state.popup.view = false;
        state.popup.textContents = '';
        state.popup.children = null;
      }
    },
  },
});

export const { handleModalState, handelReportModal, handlePopup } =
  modal.actions;
export default modal.reducer;
