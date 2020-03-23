export const isSetsEqual = (setA: Set<any>, setB: Set<any>) =>
  setA.size === setB.size && [...setA].every(value => setB.has(value));

export const intersectSets = (setA: Set<any>, setB: Set<any>) => {
  let intersection = new Set<any>();
  for (let elem of setB) {
    if (setA.has(elem)) {
      intersection.add(elem);
    }
  }
  return intersection;
};

export const isSuperset = (setA: Set<any>, subset: Set<any>) => {
  for (let elem of subset) {
    if (!setA.has(elem)) {
      return false;
    }
  }
  return true;
};

export const unionSet = (setA: Set<any>, setB: Set<any>) => {
  let union = new Set<any>(setA);
  for (let elem of setB) {
    union.add(elem);
  }
  return union;
};

export const differenceSet = (setA: Set<any>, setB: Set<any>) => {
  let difference = new Set<any>(setA);
  for (let elem of setB) {
    difference.delete(elem);
  }
  return difference;
};
