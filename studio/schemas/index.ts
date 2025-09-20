// Import compiled JS schema modules (some schemas use JS to avoid TS validation noise)
import member from './member.js';
import department from './department.js';
import event from './event.js';

export const schemaTypes = [member, department, event];

export default schemaTypes;
