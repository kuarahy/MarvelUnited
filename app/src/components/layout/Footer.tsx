export function Footer() {
  return (
    <footer className="mt-auto py-6 text-center text-xs text-gray-400 border-t border-gray-100">
      <p>
        Marvel United Randomizer — fan-made tool by{' '}
        <a
          href="https://twitter.com/pegasusfly_"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-gray-600"
        >
          @pegasusfly_
        </a>
        , not affiliated with CMON or Marvel.
      </p>
      <p className="mt-1">
        Bugs or feature suggestions? Open an issue on{' '}
        <a
          href="https://github.com/kuarahy/Marvel-United-Randomizer"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-gray-600"
        >
          GitHub
        </a>
        {' '}or hit me up on{' '}
        <a
          href="https://twitter.com/pegasusfly_"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-gray-600"
        >
          Twitter
        </a>
        .
      </p>
    </footer>
  )
}
