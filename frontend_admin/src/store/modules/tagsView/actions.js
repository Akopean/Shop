// actions
const actions = {
    addView({dispatch}, view) {
        dispatch('addVisitedView', view);
        dispatch('addCachedView', view)
    },
    addVisitedView({commit}, view) {
        commit('ADD_VISITED_VIEW', view)
    },
    addCachedView({commit}, view) {
        commit('ADD_CACHED_VIEW', view)
    },

    delView({dispatch, state}, view) {
        return new Promise(resolve => {
            dispatch('delVisitedView', view);
            dispatch('delCachedView', view);
            resolve({
                visitedViews: [...state.visitedViews],
                cachedViews: [...state.cachedViews]
            })
        })
    },
    delVisitedView({commit, state}, view) {
        return new Promise(resolve => {
            commit('DEL_VISITED_VIEW', view);
            resolve([...state.visitedViews])
        })
    },
    delCachedView({commit, state}, view) {
        return new Promise(resolve => {
            commit('DEL_CACHED_VIEW', view);
            resolve([...state.cachedViews])
        })
    },
    updateVisitedView({commit}, view) {
        commit('UPDATE_VISITED_VIEW', view)
    }
};

export default actions
