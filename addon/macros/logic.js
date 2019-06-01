import { computed } from '@ember/object';

export function equalProperties(key1, key2){
  return computed(key1, key2, function(){
    return this.get(key1) === this.get(key2);
  });
}