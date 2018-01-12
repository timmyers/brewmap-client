import { observable, autorun } from 'mobx';

export class InteractionState {
  @observable hoveredBreweryId: string;
  @observable brewerySearchString: string = '';

  @observable showChat: boolean = false;

  toggleChat() {
    console.log('current', this.showChat);
    console.log('next', !this.showChat);
    this.showChat = !this.showChat;
  }
}

export const InteractionStore = new InteractionState();

let driftApi: any = null;
// Drift 
drift.on('ready', (api: any) => {
  console.log(api);
  driftApi = api;
  api.widget.hide();

  drift.on('sidebarClose', () => {
    console.log('sidebar close');
    InteractionStore.showChat = false;
  });
  drift.on('welcomeMessage:open', () => {
    console.log('welcome message open');
  });
  drift.on('welcomeMessage:close', () => {
    console.log('welcome message close');
    InteractionStore.showChat = false;
  });
});

autorun(() => {
  console.log('autorun driftapi', driftApi);
  if (InteractionStore.showChat) {
    if (driftApi) {
      driftApi.showWelcomeMessage();
    }
  } else {
    if (driftApi) {
      driftApi.sidebar.close();
      driftApi.hideWelcomeMessage();
    }
  }
});
