import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(variables: any[], searchTerm: String, disable:boolean):any[]{
    if(!variables || !searchTerm){
      return variables;
    }
    if (disable === undefined) {
      disable=false;
    }
    if(!disable){
      return variables.filter(variable => {

        if(variable.conceptPath){
          return variable.conceptPath.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
        }else{
          return false;
        }

        //variable.conceptPath.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1

      });

    }else{
      return variables;
    }
  }

}
