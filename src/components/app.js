import {PLATFORM} from 'aurelia-pal';
import '../styles.scss'
import 'bootstrap/scss/bootstrap.scss'

export class App {
    configureRouter(config, router) {
        config.title = 'Argali';
        config.map([
            {route: 'staff', moduleId: PLATFORM.moduleName('components/staff'), title: 'Staff'},
            {route: 'report', moduleId: PLATFORM.moduleName('components/report'), title: 'Report'},
            {route: '', moduleId: PLATFORM.moduleName('components/no-selection'), title: 'Select'},
            {route: 'contacts/:id', moduleId: PLATFORM.moduleName('components/contact-detail'), name: 'contacts'}
        ]);

        this.router = router;
    }
}
