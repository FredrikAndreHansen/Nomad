export class CoursesModel {

    async getCourseInfo(uid) {
        return await new Promise((resolve) => {

            const dbRef = firebase.database().ref();
            dbRef.child("users").child(uid).get().then((snapshot) => {

                if (snapshot.exists()) {
                    const user = snapshot.val();
                    let courses = [];

                    for (let i = 0; i < user.courses.length; i++){
                        courses.push({
                            title: user.courses[i].title,
                            progress: user.courses[i].progress,
                            course: user.courses[i].course
                        });
                    }

                    resolve(courses);
                } 
            });
        }
    )}

}