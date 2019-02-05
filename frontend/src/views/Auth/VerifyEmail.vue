<template>
    <div>
        <div
            class="alert alert-primary"
            role="alert"
        >
            Processing the email confirmation request ...
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$http.post(this.$route.query.queryURL)
                .then(resp => {
                    this.$router.push('/');
                })
                .catch(err => {
                    window.toastr.error('Test', 'Error')
                });
        },
    }
</script>
