import template from './index.html'
import './style.scss'
export default () =>{
	return {
		restrict:'EA',
        template : template,
        replace:true,
        link: function(scope,element,attr){
		}
	}
};