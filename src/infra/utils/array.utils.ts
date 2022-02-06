import { NumberUtils } from './number.utils';

export class ArrayUtils {
  private readonly numberUtils: NumberUtils;
  constructor() {
    this.numberUtils = new NumberUtils();
  }

  public async shuffleArray(array: any[]) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  public async shuffleWeightedArray<T extends { weight: number }>(array: T[]) {
    const weightsRow = array.map((value) => value.weight);
    const randomLength = await this.numberUtils.getRandomNumber(
      0,
      array.length,
    );

    const minWeight = Math.min(...weightsRow);
    const maxWeight = Math.max(...weightsRow);

    const weightRange = Math.abs(maxWeight - minWeight);

    const probabilitiedArray = array.map((value) => {
      return {
        ...value,
        probability: value.weight / (weightRange * array.length),
      };
    });
    return (
      await this.shuffleArray(
        probabilitiedArray.map((value) => {
          if (Math.random() <= value.probability) {
            return { ...value };
          } else return false;
        }),
      )
    )
      .filter((value) => !!value)
      .slice(0, randomLength);
  }
}
