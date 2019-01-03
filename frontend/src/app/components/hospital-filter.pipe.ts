import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hospitalFilter'
})
export class HospitalFilterPipe implements PipeTransform {

  transform(hospitals: any[], searchTerm: String, disable:boolean):any[]{
    if(!hospitals || !searchTerm){
      return hospitals;
    }
    if (disable === undefined) {
      disable=false;
    }
if(!disable){
  return hospitals.filter(hospital => hospital.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

}else{
  return hospitals;
}
  }

}
