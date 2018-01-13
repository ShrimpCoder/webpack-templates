// import promise
import 'es6-promise/auto'
// import css
import '../style/style.scss'
// App Router
import App from './app'
import Router from 'global/router'
// pages
import Index from 'pages/index'
import Profile from 'pages/profile'

new App({
	name: 'app',
	language: 'zh',
	istest: 2, // 0正式 1测试 2开发
	host: ``,
	testHost: ``,
	cnzzId: '',
	data: {},
	onReady() {
		new Router({
			'index': Index,
			'profile': Profile
		})
	}
})
