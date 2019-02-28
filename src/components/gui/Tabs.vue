<template>
<div>
    <div class="tabs">
        <ul>
            <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
                <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>

                <span class="close"><i class="icon icon-close"></i><i class="icon blue-close"></i></span>

            </li>
        </ul>
    </div>
    <div class="tabs-details">
        <slot></slot>
    </div>
</div>
</template>
<script>
export default {
    name: 'Tabs',
    data() {
        return { tabs: [] };
    },
    created() {
        this.tabs = this.$children;
    },
    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.href == selectedTab.href);
            });
        }
    }
}
</script>
<style scoped>
.tabs{
    position: absolute!important;
    left: 0;
    right: 0;
    padding: 0!important;
    z-index: 2;
    background: #cfd8dc!important;
    color: #313131;
    font-size: 16px;
    font-weight: 300;
    height: 40px;
    overflow: scroll;
}
.tabs>ul{
    display: table-row;
}
.tabs>ul>li{
    color: #313131;
    font-size: 16px;
    font-weight: 300;
    float: left; 
    padding: 10px 30px 10px 10px;
    background: #eceff1;
    cursor: pointer;
    height: 40px;
    min-width: 104px;
    display: table-cell;
    position:relative;
}
.tabs>ul>li>a{
    padding: 10px 30px 10px 10px;
}
.tabs>ul>li.is-active{
    background: #fff;
}

.tabs>ul>li .close{
    width: 20px;
    height: 20px;
    right: -10px;
    position: absolute;
    cursor:pointer;
}

.tabs>ul>li.is-active .close{
    opacity: 1;
}

.tabs>ul>li .close .icon{
    display: none;
    height: 20px;
    width: 20px;
    position: absolute;
    margin-left: -16px;
    margin-top: 1px;
}

.tabs>ul>li.is-active .close .blue-close,
.tabs>ul>li .close:hover .icon-close,
.tabs>ul>li .close .icon-close{
    display:block;
}

.tabs-details {
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
}
</style>