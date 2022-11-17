import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReportModal {
  user: boolean;
  board: boolean;
}

interface Popup {
  textContents: string | null;
  sub: { action: (() => void) | null; text: string | null };
  view: boolean;
}
interface InitialState {
  popup: Popup;
  reportModal: ReportModal;
  modalProfile: boolean;
}

const initialState: InitialState = {
  popup: {
    view: false,
    sub: { action: null, text: null },
    textContents: null,
  },
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
        { text: string; sub?: { action: () => void; text: string } } | undefined
      >,
    ) {
      if (action.payload) {
        const { text, sub } = action.payload;
        state.popup = {
          ...state.popup,
          view: true,
          textContents: text,
          sub: {
            ...state.popup.sub,
            action: sub?.action || null,
            text: sub?.text || null,
          },
        };
      } else {
        state.popup.view = false;
        state.popup.sub = { action: null, text: null };
        state.popup.textContents = '';
      }
    },
  },
});

export const { handleModalState, handelReportModal, handlePopup } =
  modal.actions;
export default modal.reducer;
