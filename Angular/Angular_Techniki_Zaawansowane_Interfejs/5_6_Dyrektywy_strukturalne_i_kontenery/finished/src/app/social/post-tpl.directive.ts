import { Directive, Input, TemplateRef } from '@angular/core'

@Directive({
  selector: '[postTpl]'
})
export class PostTplDirective {

  @Input('postTplType')
  type = 'regular'

  constructor(public template:TemplateRef<any>) { }

}
