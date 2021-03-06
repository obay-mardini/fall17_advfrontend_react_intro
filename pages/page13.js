// next.js stuff
import Head from "next/head"
import Link from "next/link"

// Material UI
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import AppBar from "material-ui/AppBar"
import { Tabs, Tab } from "material-ui/Tabs"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import Drawer from "material-ui/Drawer"
import MenuItem from "material-ui/MenuItem"
import Subheader from "material-ui/Subheader"
import injectTapEventPlugin from "react-tap-event-plugin"

// my custom components
import Footer from "../components/footers/footer2"
import CourseTab from "../components/tabs/courseTab"
import HomeworkTab from "../components/tabs/homeworkTab"
import CalendarTab from "../components/tabs/calendarTab"

import get from "../services/json-server/get"

if (typeof window !== "undefined") injectTapEventPlugin()

export default class extends React.Component {
  static async getInitialProps() {
    const response = await get("/courses")
    const courses = await response.json()
    return { courses }
  }
  constructor(props) {
    super(props)
    this.state = {
      drawerOpen: false
    }

    this.switchDrawer = this.switchDrawer.bind(this)
  }
  switchDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }
  render() {
    const courseId = this.props.url.query.course || "advfrontend"
    const course = this.props.courses.filter(
      course => course.id === courseId
    )[0]
    return (
      <div>
        <Head>
          <title>My thirteenth page!</title>
          <meta name="description" content="Let's make the web great again" />
          <meta name="keywords" content="sample, react, demo, awesome" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="static/main.css" />
          <link
            rel="stylesheet"
            href="//fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <meta charSet="utf-8" />
        </Head>
        <div>
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <div>
              <div>
                <AppBar
                  onLeftIconButtonTouchTap={this.switchDrawer}
                  title={course.title || "Default Course"}
                  iconClassNameRight="muidocs-icon-navigation-expand-more"
                >
                  <Drawer
                    docked={false}
                    open={this.state.drawerOpen}
                    onRequestChange={this.switchDrawer}
                  >
                    <Subheader
                      style={{
                        height: "172px",
                        width: "304px",
                        backgroundColor: "#00BCD4",
                        color: "#FFFFFF",
                        fontSize: "16px",
                        fontWeight: "normal"
                      }}
                    >
                      <img
                        style={{ marginTop: "40px" }}
                        src="/static/04_menu_mobile/redi_avatar.png"
                        alt="Redi avatar"
                      />
                      <div style={{ marginBottom: "26px" }}>
                        ReDI School of Digital Integration
                      </div>
                    </Subheader>
                    {this.props.courses.map((item, index) => (
                      <MenuItem
                        key={item.id}
                        primaryText={item.title}
                        href={`page13?course=${item.id}`}
                      />
                    ))}
                  </Drawer>
                </AppBar>
              </div>
              <div>
                <Tabs>
                  <Tab label="COURSES">
                    <CourseTab course={course} />
                  </Tab>
                  <Tab label="HOMEWORK">
                    <HomeworkTab course={course} />
                  </Tab>
                  <Tab label="CALENDAR">
                    <CalendarTab course={course} />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    )
  }
}
