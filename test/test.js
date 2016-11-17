const chai = require('chai');
const expect = chai.expect;
const moment = require('moment');
const sinon = require('sinon');
const { reader, writer } = require('./../index');

chai.use(require('sinon-chai'));

describe('moment-transit', () => {
   it('serializes a moment', () => {
      const date = moment.utc('1999-12-31');
      const serialized = writer.write(date);

      expect(serialized).to.eql('{"~#moment":"1999-12-31T00:00:00Z"}');
   });

   it('deserializes a moment', () => {
      const date = moment.utc('1999-12-31');
      const serialized = '{"~#moment":"1999-12-31T00:00:00Z"}'
      const deserialized = reader.read(serialized);

      expect(date.isSame(deserialized)).to.equal(true);
   });

   it('warns when writing invalid moments', () => {
      try {
         sinon.stub(console, 'warn').returns();
         const date = moment.invalid();
         writer.write(date);

         expect(console.warn).to.have.been.calledOnce;
         expect(console.warn).to.have.been.calledWith(sinon.match.instanceOf(Error));
      } finally {
         console.warn.restore();
      }
   });

   it('invalid moments are still invalid when deserialized', () => {
      try {
         sinon.stub(console, 'warn').returns();

         const date = moment.invalid();
         const serialized = writer.write(date);
         const deserialized = reader.read(serialized);

         expect(deserialized.isValid()).to.equal(false);
      } finally {
         console.warn.restore();
      }
   });
})
