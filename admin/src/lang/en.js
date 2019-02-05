export default {
    route: {
        dashboard: 'Dashboard',
        introduction: 'Introduction',
        documentation: 'Documentation',
        guide: 'Guide',
        permission: 'Permission',
        pagePermission: 'Page Permission',
        directivePermission: 'Directive Permission',
        icons: 'Icons',
        components: 'Components',
        componentIndex: 'Introduction',
        tinymce: 'Tinymce',
        markdown: 'Markdown',
        jsonEditor: 'JSON Editor',
        dndList: 'Dnd List',
        splitPane: 'SplitPane',
        avatarUpload: 'Avatar Upload',
        dropzone: 'Dropzone',
        sticky: 'Sticky',
        countTo: 'CountTo',
        componentMixin: 'Mixin',
        backToTop: 'BackToTop',
        dragDialog: 'Drag Dialog',
        dragSelect: 'Drag Select',
        dragKanban: 'Drag Kanban',
        charts: 'Charts',
        keyboardChart: 'Keyboard Chart',
        lineChart: 'Line Chart',
        mixChart: 'Mix Chart',
        example: 'Example',
        nested: 'Nested Routes',
        menu1: 'Menu 1',
        'menu1-1': 'Menu 1-1',
        'menu1-2': 'Menu 1-2',
        'menu1-2-1': 'Menu 1-2-1',
        'menu1-2-2': 'Menu 1-2-2',
        'menu1-3': 'Menu 1-3',
        menu2: 'Menu 2',
        Table: 'Table',
        dynamicTable: 'Dynamic Table',
        dragTable: 'Drag Table',
        inlineEditTable: 'Inline Edit',
        complexTable: 'Complex Table',
        treeTable: 'Tree Table',
        customTreeTable: 'Custom TreeTable',
        tab: 'Tab',
        form: 'Form',
        createArticle: 'Create Article',
        editArticle: 'Edit Article',
        articleList: 'Article List',
        errorPages: 'Error Pages',
        page401: '401',
        page404: '404',
        errorLog: 'Error Log',
        excel: 'Excel',
        exportExcel: 'Export Excel',
        selectExcel: 'Export Selected',
        uploadExcel: 'Upload Excel',
        zip: 'Zip',
        exportZip: 'Export Zip',
        theme: 'Theme',
        clipboardDemo: 'Clipboard',
        i18n: 'I18n',
        externalLink: 'External Link'
    },
    navbar: {
        logOut: 'Log Out',
        dashboard: 'Dashboard',
        github: 'Github',
        screenfull: 'Screenfull',
        theme: 'Theme',
        size: 'Global Size'
    },
    login: {
        title: 'Login Form',
        login: 'Login',
        email: 'Email Address',
        username: 'Username',
        password: 'Password',
        any: 'any',
        remember: 'Remember Me',
        thirdparty: 'Or connect with',
        thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !',
        invalid_crd: 'Invalid Credentials',
        email_wrong: 'Email is wrong',
        pass_wrong: 'Password is wrong',
    },
    documentation: {
        documentation: 'Documentation',
        github: 'Github Repository'
    },
    permission: {
        roles: 'Your roles',
        switchRoles: 'Switch roles'
    },
    guide: {
        description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
        button: 'Show Guide'
    },
    components: {
        documentation: 'Documentation',
        tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
        dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
        stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
        backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
        backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
        imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
    },
    table: {
        dynamicTips1: 'Fixed header, sorted by header order',
        dynamicTips2: 'Not fixed header, sorted by click order',
        dragTips1: 'The default order',
        dragTips2: 'The after dragging order',
        title: 'Title',
        importance: 'Imp',
        type: 'Type',
        remark: 'Remark',
        search: 'Search',
        add: 'Add',
        export: 'Export',
        reviewer: 'reviewer',
        id: 'ID',
        date: 'Date',
        author: 'Author',
        readings: 'Readings',
        status: 'Status',
        actions: 'Actions',
        edit: 'Edit',
        publish: 'Publish',
        draft: 'Draft',
        delete: 'Delete',
        cancel: 'Cancel',
        confirm: 'Confirm'
    },
    errorLog: {
        tips: 'Please click the bug icon in the upper right corner',
        description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
        documentation: 'Document introduction'
    },
    excel: {
        export: 'Export',
        selectedExport: 'Export Selected Items',
        placeholder: 'Please enter the file name(default excel-list)'
    },
    zip: {
        export: 'Export',
        placeholder: 'Please enter the file name(default file)'
    },
    theme: {
        change: 'Change Theme',
        documentation: 'Theme documentation',
        tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
    },
    tagsView: {
        refresh: 'Refresh',
        close: 'Close',
        closeOthers: 'Close Others',
        closeAll: 'Close All'
    },
    error: {
        server: 'Server error, please contact the development team.',
    },
    forms: {
        submit: 'Submit',
        clear: 'Clear'
    },
    products:{
        model: 'Model',
        price: 'Price',
        status: 'Status',
    },
    $vuetify: {
        'dataIterator': {
            'rowsPerPageText': 'Items per page:',
            'rowsPerPageAll': 'All',
            'pageText': '{0}-{1} of {2}',
            'noResultsText': 'No matching records found',
            'nextPage': 'Next page',
            'prevPage': 'Previous page'
        },
        'dataTable': {
            'rowsPerPageText': 'Rows per page:'
        },
        'noDataText': 'No data available'
    },
    validations: {
        messages: {
            currency: 'The {0} value is not correct.'
        },
        attributes: {
            name: 'Name',
            email: 'Email',
            model: 'Model',
            price: 'Price'
        },
        custom: {
            name: {
                required: 'Name can not be empty',
                max: 'The name field may not be greater than 10 characters',
                min: 'The name field may not be less than 3 characters'
            },
            email: {
                required: 'Email can not be empty',
                email: 'The Email field must be a valid email.',
                // custom messages
            },
            model: {
                required: 'Model can not be empty',
                min: 'The name field may not be less than 3 characters'
                // custom messages
            },
            price: {
                required: 'Price can not be empty',
                // custom messages
            },
        }
    },
}