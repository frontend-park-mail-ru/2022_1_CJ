const createJanitor = () => {
  const janitor = {};

  const litter = [];
  janitor.add = (callback) => {
    litter.push(callback);
  };

  janitor.cleanup = () => {
    litter.forEach((callback) => callback());
    litter.splice(0);
  };

  return janitor;
};

const instance = createJanitor();
export { instance as Janitor };
