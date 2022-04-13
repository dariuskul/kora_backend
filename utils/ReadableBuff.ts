const { Readable } = require('stream');

export class BufferStream extends Readable {
  constructor(opts) {
    super(opts);
    this.buf = opts.buf;
  }
  _read(size) {
    this.push(this.buf);
    this.push(null); // signal end of stream
  }
}