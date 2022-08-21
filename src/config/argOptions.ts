import arg from 'arg';

export const argOptions: arg.Spec = {
  "-h": Boolean,
  "-c": [String],
  "-s": [String],
  "-n": [String],
  "-t": String,
  "-i": [String],
  '-help': '-h',
  '-component': '-c',
  '-screen': '-s', 
  '-navigator': '-n', 
  '-navigator-type': '-t', 
  '-include': '-i', 
}