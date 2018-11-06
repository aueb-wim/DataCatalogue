import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'versionFilter'
})
export class VersionFilterPipe implements PipeTransform {

  transform(versions: any[], searchTerm: String):any[]{
    if(!versions || !searchTerm){
      return versions;
    }

    return versions.filter(ver => ver.code.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
