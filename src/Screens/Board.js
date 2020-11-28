import React, { Component } from 'react';
const day_list=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var habit_list;
var today=new Date();
var today_day, today_date, yesterday_day;

class Board extends Component{
    habit_list=this.props.state.habit;//[1:{'name':eat_apple, 'record':[(2020.2.2, Tue, 1),..., (2019.1.1, Wed, 0)}}]
    state={
        username:this.props.state.username,
        total:Object.keys(this.habit_list).length,
        board:this.habit_list
    }

    today_day=day_list[today.getDay()]; //string 
    today_date=today.toLocaleDateString(); //오늘 연도.월.날짜
    yesterday_day=day_list[today.getDay()-1]; //string

    handleSaveData=(data)=>{ //data={'name':~}, board:{1:{name, record}, 2:{name, record}}
        var total=this.state.total++;
        var new_board=this.state.board;
        new_board[total]={'name':data.habit, 'record':[[today_date, today_day, 0], ["","",0]]}
        
        this.setState({
            board:new_board,
            total:this.state.total++
        });

        console.log(this.state);
    }
    
    checkUpdate=(data)=>{ //data={index, check, today/yesterday}
        console.log(this.habit_list[data.index]);
        if (data.today){
            this.habit_list[data.index]['record'][0][2]=data.check;   
        }
        else{
            console.log("yesterday update");
            this.habit_list[data.index]['record'][1][2]=data.check;    
        }    
        this.setState({board:this.habit_list},()=>{
            console.log(this.state);
        })
    }

    sendData=()=>{
        fetch('http://localhost:8000/board',{
            method:"post",
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials:"same-origin",
            body:JSON.stringify(this.state),
        }).then(res=>res.json())
            
    }

    render(){
        const board=this.state.board; //{1:{name, record}. 2:...}
        //Object.keys(board).map(key=>console.log(key));
        return(
            <div>
                <table border="1">
                    <tbody>
                        <tr align="center">
                            <td width="50">#</td>
                            <td width="200">Habit</td>
                            <td width="50">{this.today_day}</td>
                            <td width="50">{this.yesterday_day}</td>
                        </tr>
                        { 
                            Object.keys(board).map(key=>(
                                <BoardItem checkUpdate={this.checkUpdate} index={key} item={board[key]} today_check={board[key]['record'][0][2]} yesterday_check={board[key]['record'][1][2]}/>)
                            )
                        }
                    </tbody>
                </table>
                <AddItem SaveData={this.handleSaveData}/>
                <SaveAll SendData={this.sendData}/>
            </div>
        )
    }
}

class AddItem extends Component{
    state={}

    handleChange=(event)=>{
        //console.log(event.target.value);
        this.setState({
            [event.target.name]:event.target.value
        })
        //console.log(this.state);
    }

    handleSubmit=(event)=>{
        console.log("you click '제출'");
        console.log(this.state);
        event.preventDefault();
        if (this.state){ //not empty habit
            this.props.SaveData(this.state); 
            this.setState({});
        }
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div><br></br></div>
                <input placeholder="what's your habit?" name="habit" onChange={this.handleChange}/>
                <button type="submit">새 습관 등록</button>
            </form>
        )
    }
}

class BoardItem extends Component{ //함수로 checkUpdate 받음
    state={}
    
    handleCheck=(event)=>{ //check or not
        var index=event.target.id;
        console.log(index);
        var today=(event.target.name=="today");
        var check=event.target.checked; //1 or 0
        this.setState({index:index, today:today, check:check},
            ()=>{
                console.log(this.state);
                event.preventDefault();
                this.props.checkUpdate(this.state);
            })
    }
    render(){
        //console.log(this.props);
        return(
            <tr>
                <td>{this.props.index}</td>         
                <td>{this.props.item.name}</td>
                <td><input type="checkbox" checked={this.props.today_check} onChange={this.handleCheck} name="today" id={this.props.index}/></td>
                <td><input type="checkbox" checked={this.props.yesterday_check} onChange={this.handleCheck} name="yesterday" id={this.props.index}/></td>
            </tr>
        );
    }
}

class SaveAll extends Component{

    handleSubmit=(event)=>{

    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div><br></br></div>
                <button type="submit">저장</button>
            </form>
        )
    }
}

export default Board;