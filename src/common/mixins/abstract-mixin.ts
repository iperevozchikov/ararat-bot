export abstract class AbstractMixin {
  constructor(...args: unknown[]) {
    if (args.length > 0) {
      throw new Error('Mixin constructor must be without arguments');
    }
  }
}
