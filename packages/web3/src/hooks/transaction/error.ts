export class AccountApiNotFoundError extends Error {
  constructor(message: string = 'Account API not found') {
    super(message);
    this.name = 'AccountApiNotFoundError';
  }
}

export class BundlerClientNotFoundError extends Error {
  constructor(message: string = 'Bundler client not found') {
    super(message);
    this.name = 'BundlerClientNotFoundError';
  }
}

export class NoSignatureFound extends Error {
  constructor(message: string = 'No cached signature found') {
    super(message);
    this.name = 'NoSignatureFound';
  }
}

export class BundlerRequestError extends Error {
  code: string;
  constructor(message: string = 'Bundler request error', code: string) {
    super(message);
    this.name = 'BundlerRequestError';
    this.code = code;
  }
}

export class SwitchChainError extends Error {
  constructor(message: string = 'Please switch to the correct network') {
    super(message);
    this.name = 'SwitchChainError';
  }
}
