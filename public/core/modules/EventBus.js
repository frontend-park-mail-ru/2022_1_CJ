export const EventBusChannels = {
  Auth: "auth",
};

export const AuthEvents = {
  Signup: "signup",
  Login: "login",
}

class EventBus {
  #channels;
  constructor() {
    this.#channels = {};
  }

  /**
   * Add new channel to the bus
   * @param {String} channelName - name of the channel 
   */
  addChannel(channelName) {
    this.#channels[channelName] = {};
  }

  /**
   * Add listener to the event in the channel
   * @param {String} channelName - name of the channel
   * @param {String} event - name of the event
   * @param {Function} callback - callback on the event in the channel
   */
  subscribe(channelName, event, callback) {
    const channel = this.#channels[channelName];
    if (!channel) {
      throw new Error(`channel with [${channel}] does not exist`);
    }

    if (!channel[event]) {
      channel[event] = new Set();
    }

    channel[event].add(callback);
  }

  /**
   * Delete listener from the event in the channel
   * @param {String} channelName - name of the channel
   * @param {String} event - name of the event
   * @param {Function} callback - callback on the event in the channel
   */
  unsubscribe(channelName, event, callback) {
    const channel = this.#channels[channelName];
    if (!channel) {
      throw new Error(`channel with [${channel}] does not exist`);
    }
    channel[event]?.delete(callback);
  }

  /**
   * Trigger the event in the channel
   * @param {String} channelName - name of the channel
   * @param {String} event - name of the event
   * @param {Object?} args - optional args for the callback
   */
  emit(channelName, event, args = null) {
    const channel = this.#channels[channelName];
    if (!channel) {
      throw new Error(`channel with [${channelName}] does not exist`);
    }

    const callbacks = channel[event];
    if (!callbacks) {
      throw new Error(`no [${event}] in [${channel}]`);
    }

    callbacks.forEach((callback) => {
      callback(args);
    });
  }
}

export default new EventBus();
