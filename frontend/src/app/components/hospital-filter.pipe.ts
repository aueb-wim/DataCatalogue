import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hospitalFilter'
})
export class HospitalFilterPipe implements PipeTransform {

  transform(hospitals: any[], searchTerm: String):any[]{
    if(!hospitals || !searchTerm){
      return hospitals;
    }

    return hospitals.filter(hospital => hospital.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
