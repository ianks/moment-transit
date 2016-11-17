# moment-transit

A library which enables Moment objects to be serialized by
[transit-js](https://github.com/cognitect/transit-js).

## Usage

```javascript
import moment from 'moment';
import { reader, writer } from 'moment-transit';


const serialized = writer.write(moment());
console.log(serialized);

const deserialized = reader.read(serialized);
console.log(deserialized);
```
