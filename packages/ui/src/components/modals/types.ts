export type Modals =
  | "login"
  | "invalid-network"
  | "connect-web3-auth"
  | "trade-details"
  | "how-it-works"
  | "wallet"
  | "roi-calculator"
  | "edit-profile"
  | "assign-campaign"
  | "create-campaign"
  | "avatar-story"
  | "refund";

export type ModalPropsStore = {
  createCampaign: CreateCampaignModalProps["createCampaign"];
};

export interface ModalsStoreState {
  modal?: Modals;
  props?: Partial<ModalPropsStore>;
}

export interface ModalsStoreActions {
  openModal: (modal: Modals, props?: Partial<ModalPropsStore>) => void;
  closeModal: () => void;
}

export interface CreateCampaignModalProps {
  createCampaign?: {
    refetchRefCodes: () => void;
  };
}

export type ModalsStore = ModalsStoreState & ModalsStoreActions;
