import { DaprClient } from '@dapr/dapr';
import { Injectable } from '@nestjs/common';

const daprHost = 'http://localhost';
const daprPort = '3100';

const textSummaryPubSubName = 'textSummaryPubSub';
const textSummaryPubSubTopic = 'textSummary';

const imageColoringPubSubName = 'imageColoringPubSub';
const imageColoringPubSubTopic = 'imageColoring';

@Injectable()
export class AppService {
  client: DaprClient;

  constructor() {
    this.client = new DaprClient({ daprHost, daprPort });
  }
  getHello(): { message: string } {
    return { message: 'Hello World!' };
  }

  async publishText(params: { text: string }) {
    const { text } = params;
    await this.client.pubsub.publish(
      textSummaryPubSubName,
      textSummaryPubSubTopic,
      { payload: text },
    );
  }

  async publishImage(params: { file: Express.Multer.File }) {
    const { file } = params;
    await this.client.pubsub.publish(
      imageColoringPubSubName,
      imageColoringPubSubTopic,
      { payload: file },
    );
  }
}
