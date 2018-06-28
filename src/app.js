import {PLATFORM} from 'aurelia-pal';
import './styles.scss'

export class App {
    configureRouter(config, router) {
        config.title = 'Argali';
        config.map([
            {route: 'staff', moduleId: PLATFORM.moduleName('staff'), title: 'Staff'},
            {route: 'report', moduleId: PLATFORM.moduleName('report'), title: 'Report'},
            {route: '', moduleId: PLATFORM.moduleName('no-selection'), title: 'Select'},
            {route: 'contacts/:id', moduleId: PLATFORM.moduleName('contact-detail'), name: 'contacts'}
        ]);

        this.router = router;
    }
}
