export function coursesView(userName) {
    return `
        <h2 class="header-text-center-big">Welcome, ${userName}</h2>
        <img src="../../../../graphics/icons/signoutIcon.svg" class="signout-icon" id="sign-out-btn" alt="Signout Icon" title="Sign Out" />
        <hr class="hr-big" />
        <p class="p-dark-center-small">Courses</p>
        <div class="medium-space"></div>
    `;
}

export function getCourseView(courseInfo) {
    const { title, progress, course } = courseInfo;
    const setProgress = progress === 0 ? 'START COURSE' : progress + '% complete';

    return `
        <div class="course-wrapper">
            <h2 class="header-text-center">${title}</h2>
            <div class="course-container" style="background-image: url('../../../../graphics/images/${course}.jpg');">
                <div class="course-container-overlay">
                    <div class="course-hover-icon"><img class="course-icon-img" src="../../../../graphics/icons/playIcon.svg" /></div>
                </div>
            </div>
            <div class="course-progress-bar">
                <div class="course-progress-bar-set-percentage" style="width: ${progress}%"></div>
            </div>
            <p class="p-dark-center-left negative-margin-xx-small">${setProgress}</p>
        </div>
        <div class="footer-size"></div>
    `;
}