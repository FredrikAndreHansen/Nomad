import { CoursesModel } from "../model/coursesModel.js";
import { LoadingController } from "../../../handlers/controller/loadingController.js";
import { HandlerController } from "../../../handlers/controller/handlerController.js";
import { coursesView, getCourseView } from "../view/coursesView.js";
import { signOut } from "../../../helpers/auth.js";

const loadingController = new LoadingController();

export class CoursesController {

    setView(userInfo) {
        const { userId, name } = userInfo;

        const contentDOMEl = document.querySelector('#content');
        contentDOMEl.innerHTML = coursesView(name);

        const coursesModel = new CoursesModel();
        coursesModel.getCourseInfo(userId).then((courses) => {
            for (let i = 0; i < courses.length; i++) {
                contentDOMEl.insertAdjacentHTML(
                    'afterend', 
                    getCourseView({ 
                        title: courses[i].title, 
                        progress: courses[i].progress,
                        course: courses[i].course
                    })
                );
            }

            loadingController.remove();
        }).catch((error) => {
            const handlerController = new HandlerController();
            handlerController.displayError(error);
            loadingController.remove();
        });

        // Sign out
        const signOutBtnDOMEl = document.querySelector('#sign-out-btn');
        signOutBtnDOMEl.addEventListener('click', function() {
            signOut();
        });
    }

}