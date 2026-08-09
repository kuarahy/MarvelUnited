export class ShuffleService {
  shuffle<T>(items: T[]): T[] {
    const copy = [...items]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }

  pickOne<T>(items: T[]): T {
    const shuffled = this.shuffle(items)
    return shuffled[0]
  }

  pickMany<T>(items: T[], count: number): T[] {
    return this.shuffle(items).slice(0, count)
  }
}
