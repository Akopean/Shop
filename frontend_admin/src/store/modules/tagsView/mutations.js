// mutations
const mutations = {
    ADD_VISITED_VIEW: (state, view) => {
        if (state.visitedViews.some(v => {
            return v.path === view.path
        })) return;
        state.visitedViews.push(
            Object.assign({}, {
                title: view.name || 'no-name',
                path: view.path,
                query: view.query,
                fullPath: view.fullPath,
            })
        );
    },
    ADD_CACHED_VIEW: (state, view) => {
        if (state.cachedViews.includes(view.name)) return;
        if (!view.meta.noCache) {
            state.cachedViews.push(view.name)
        }
    },

    DEL_VISITED_VIEW: (state, view) => {
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
                state.visitedViews.splice(i, 1);
                break
            }
        }
    },
    DEL_CACHED_VIEW: (state, view) => {
        for (const i of state.cachedViews) {
            if (i === view.name) {
                const index = state.cachedViews.indexOf(i);
                state.cachedViews.splice(index, 1);
                break
            }
        }
    },
    UPDATE_VISITED_VIEW: (state, view) => {
        for (let v of state.visitedViews) {
            if (v.path === view.path) {
                v = Object.assign(v, view);
                break
            }
        }
    }
};

export default mutations;
