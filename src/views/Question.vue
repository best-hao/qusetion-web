<template>
    <div class="container">
        <div class="check-date">
            <DatePicker size="large" v-model="date" placeholder="选择日期" @on-change="checkDate"></DatePicker>
            
            <Tooltip placement="top" content="当前日期题目已满10条，无法添加" :disabled="!disabled">
                <Button type="primary" :disabled="disabled" class="add-btn" @click="add">新增题目</Button>
            </Tooltip>
        </div>
        <Row :gutter="16" class="list">
            <Spin size="large" fix v-if="loading"></Spin>
            <div v-if="lists.length>0">
                <Col :sm="24" :md="12" :lg="8" v-for="(q,i) in lists" :key="i">
                    <Card class="card">
                        <p slot="title">第{{q.ord}}题({{q.enable ? "多选": "单选"}})</p>
                        <p slot="extra">
                            <span class="btn" @click="revse(q.id)">修改</span>
                            <span class="line">/</span>
                            
                            <Poptip
                                confirm
                                title="删除无法恢复，确定删除吗?"
                                @on-ok="deleteQu(q.id)">
                                <span class="btn">删除</span>
                            </Poptip>
                        </p>
                        <Divider orientation="left">内容:</Divider>
                        <p class="q-content">{{q.content}}</p>
                        <Divider orientation="left">答案:</Divider>
                        <p>{{q.answer}}</p>
                    </Card>
                </Col>
            </div>
            <p class="kong" v-else>当前日期暂未添加题目，请更换日期查看，或着去添加题目。</p>
        </Row>
    </div>
</template>

<script>
import { getQuestions, addQuestion, questionList } from "@/http/http.js"
import moment from "moment";

export default {
    data () {
        return {
            loading: false,
            time: null,
            date: null,
            lists:[],
            disabled: false
        }
    },
    methods: {
        add(){
            this.$router.push({
                name: 'add',
                query: {
                    time: this.time
                }
            })
        },
        revse(id){
            this.$router.push({
                name: 'add',
                query: {
                    id: id,
                    time: this.time
                }
            })
        },
        init(){
            this.loading = true;
            const { time } = this;
            getQuestions({time}).then(res => {
                this.lists = res.data;
                if( this.lists.length < 10 ){
                    this.disabled = false;
                }else{
                    this.disabled = true;
                }
                this.loading = false;
            })
            // questionList().then(res => {})
        },
        checkDate(value){
            this.time = moment(value).valueOf();
            this.init();
        },
        deleteQu(id){
            const params = {
                id: id,
                type: 2
            }
            addQuestion(params).then(res => {
                this.$Message.success('删除成功');
                this.init();
            })
        }
    },
    mounted () {
        if( this.$route.query.time ){
            this.time = this.$route.query.time;
            this.date = new Date(this.time);
        }else{
            this.date = new Date();
            this.time = moment(moment(this.date).format('YYYY-MM-DD')).valueOf();
        }
        this.init();
    }
}
</script>

<style scoped>
.container{
	background: #fff;
	flex: auto;
	position: relative;
}
.check-date{
    margin: 20px;
}
.list{
    padding: 0 20px;
    position: relative;
}
.add-btn{
    margin-left: 20px;
}
.card{
    margin-bottom: 20px;
}
.line{
    margin: 0 10px;
}
.btn:hover{
    color: #2d8cf0;
    cursor: pointer;
}
.q-content{
    height: 3em;
    margin-bottom: 10px;
    overflow: hidden;
}
.kong{
    text-align: center;
    line-height: 100px;
}
</style>


