// List Filtering & Pagination Project

    // Global Variables

    const studentList = document.querySelector('.student-list').children;
    const pageDiv = document.querySelector('.page');
    const searchTextField = document.createElement('input');
    const searchButton = document.createElement('button');
    const noResultsMessage = createMessage('No Students Have Been Found!');

    // showPage

    function showPage(pageNumber, list, studentsPerPage) {

        // Show Students From Index (pageNumber * studentsPerPage) - studentsPerPage.

        const firstIndex = (pageNumber * studentsPerPage) - studentsPerPage;

        // Show Students Until Index (pageNumber * studentsPerPage) - 1.

        const lastIndex = (pageNumber * studentsPerPage) - 1;

        /*

        Examples:

            1. If The Given Page Number Is 1 & We Want To Display 10 Students On Each Page, Show Students From Index 0 To 9.
            2. If The Given Page Number Is 2 & We Want To Display 10 Students On Each Page, Show Students From Index 10 To 19, Etc..

         */

        for (let i = 0; i < list.length; i ++) {

            // Display The Right Students Based On The Given Page Number.

            if (i >= firstIndex && i <= lastIndex)
                list[i].style.display = '';

            // Hide The Rest Of The Students.

            else
                list[i].style.display = 'none';

        }

    }

    // createDiv
    // Create A Pagination Div & Append It To The Page Div.

    function createDiv() {

        const currentPaginationDiv = document.querySelector('div.pagination');

        if (currentPaginationDiv !== null)
            pageDiv.removeChild(currentPaginationDiv);

        const divToAppend = document.createElement('div');

        divToAppend.className = 'pagination';

        return pageDiv.appendChild(divToAppend);

    }

    // createUL
    // Create A UL Element To Store The Pagination Links. Append It To The Pagination Div.

    function createUL() {

        const paginationDiv = createDiv();
        const ul = document.createElement('ul');

        return paginationDiv.appendChild(ul);

    }

    // addListItems

    function addListItems(pagesList, pagesAmount) {

        // Create Links As The Number Of The Pages.

        for (let i = 0; i < pagesAmount; i ++) {

            const li = document.createElement('li');
            const a = document.createElement('a');

            // Give Each Link A Number To Display, Starting From 1.

            a.textContent = i + 1;

            // Add The List Items To The UL That Was Created In Order To Store Pagination Links.

            li.appendChild(a);
            pagesList.appendChild(li);

        }

    }

    // removeActiveClass
    // Remove The 'Active' Class From All The Links.

    function removeActiveClass(anchors) {

        for (let i = 0; i < anchors.length; i ++)
            anchors[i].classList.remove('active');

    }

    // addActiveClass
    // Add The 'Active' Class To The Clicked Link.

    function addActiveClass(clickedLink) {

        if (clickedLink !== null)
            clickedLink.classList.add('active');

    }

    // addAnchorListeners

    function addAnchorListeners() {

        const anchors = document.querySelectorAll('a');

        for (let i = 0; i < anchors.length; i ++)
            anchors[i].addEventListener('click', e => {

                /*

                Every Time The User Will Click On A Link -

                  1. Show The Right Page Of Students, Based On The Number That The Link Displays.
                  2. Remove The 'Active' CSS Class From All The Links.
                  3. Add The 'Active' Class Only To The Clicked Link.

                */

                showPage(anchors[i].textContent, studentList, 10);
                removeActiveClass(anchors);
                addActiveClass(e.target);

            });

    }

    // appendPageLinks

    function appendPageLinks(list, maxRecords) {

        /*

        Calculate The Number Of Needed Pagination Links.
        Take The Total Amount Of Students And Divide It By The Maximum Number Of Records That You Would Like To Display On A Page.
        In This Case, We Won't Display More Than 10 Students On Each Page.
        Finally, Use Math.Ceil To Deal With Decimal Fractions.
        For Example, If There Are 54 Students Then We'll Create 6 Pagination Links.
        The First 5 Pages Will Display 10 Students Each, And The Sixth Page Will Display The Remaining 4 Students.

        */

        const pagesAmount = Math.ceil(list.length / maxRecords);

        // Create A UL To Store The Pagination Links.

        const pagesList = createUL();

        // Add The Pagination Links To The List. The Number Of Links That We Should Create Is As The Calculated Amount Of Pages.

        addListItems(pagesList, pagesAmount);

    }

    // getFirstAnchor
    // Return The First Pagination Link.

    function getFirstAnchor() {

        return document.querySelector('a');

    }

    // createSearchBar
    // Create A Div That Stores A Search Text Field & A Search Button. Append The Div To The Top Of The Page.

    function createSearchBar() {

        const parentDiv = document.querySelector('.page-header');
        const div = document.createElement('div');

        div.className = 'student-search';
        searchButton.className = 'search-button';

        searchTextField.placeholder = 'Search For Students ...';
        searchButton.textContent = 'Search';

        div.appendChild(searchTextField);
        div.appendChild(searchButton);

        parentDiv.appendChild(div);

    }

    // searchTerm

    function searchTerm(inputValue) {

        // Soon This String Will Be Compared To Another String, And I Wanted To Ignore Case Considerations.

        const termToSearch = inputValue.toUpperCase();
        const studentEmails = document.querySelectorAll('span.email');
        const studentNames = document.querySelectorAll('h3');
        const resultsToShow = [];

        /*

        The indexOf Method Will Return 0 For An Empty String. In This Kind Of Case, All Of The Students Will Be Shown.
        In Order To Fix This, I Decided That If The Text Field Is Empty, Then The Students Will Again Be Shown To The User Based On The Current Page Number, And Not Based On The Value Of The Search Box.

        */

        if (termToSearch === '')
            runScript(1, studentList, 10, studentList.length);

        else {

            for (let i = 0; i < studentList.length; i ++) {

                /*

                The indexOf Method Returns The First Index At Which A Given Element Can Be Found, Or -1 If It Is Not Present.
                I Decided To Show & Hide Students Based On The Value That This Method Returns.
                The Term That The User Inserts Will Be Compared To The Name & Email Address Of Each Student.
                I Also Used The 'toUpperCase' Method In Order To Compare One String To Another, While Ignoring Case Considerations.

                 */

                if (studentEmails[i].textContent.toUpperCase().indexOf(termToSearch) > -1 || studentNames[i].textContent.toUpperCase().indexOf(termToSearch) > -1)
                    resultsToShow.push(studentList[i]);

                else
                    studentList[i].style.display = 'none';

            }

            runScript(1, resultsToShow, 10, resultsToShow.length);

        }

    }

    // displayNoResultsMessage
    // Display A 'No Results' Message If There Are Zero Results To Show.

    function displayNoResultsMessage(numberOfResults) {

        if (numberOfResults === 0)
            noResultsMessage.style.display = '';

        else
            noResultsMessage.style.display = 'none';

    }

    // addSearchKeyUpListener

    function addSearchKeyUpListener() {

        searchTextField.addEventListener('keyup', () => searchTerm(searchTextField.value));

    }

    // addSearchClickListener

    function addSearchClickListener() {

        searchButton.addEventListener('click', () => searchTerm(searchTextField.value));

    }

    // createMessage
    // A Reusable Component To Create Any Kind Of Message.

    function createMessage(messageToShow) {

        const div = document.createElement('div');
        const h3 = document.createElement('h3');

        h3.innerHTML = messageToShow;
        div.appendChild(h3);

        div.style.textAlign = 'center';
        div.style.display = 'none';
        div.style.fontWeight = 'bold';
        div.style.color = '#4ba6c3';

        return pageDiv.appendChild(div);

    }

    // filterStudents
    // Add Listeners To The Search Box & To The Search Button.

    function filterStudents() {

        addSearchKeyUpListener();
        addSearchClickListener();

    }

    // runScript

    function runScript(pageNumber, list, maxRecords, numberOfResults) {

        showPage(pageNumber, list, maxRecords);
        appendPageLinks(list, maxRecords);
        addAnchorListeners();
        addActiveClass(getFirstAnchor());
        displayNoResultsMessage(numberOfResults);

    }

    // Run The Script

    runScript(1, studentList, 10);
    createSearchBar();
    filterStudents();