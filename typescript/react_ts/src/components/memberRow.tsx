import * as React from 'react';
import { MemberEntity } from '../model';

export class MemberRow extends React.Component<{member: MemberEntity}> {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.member, '--------');
        return (
            <tr>
                <td>
                    <img src= {this.props.member.avatar_url} />
                </td>
                <td>
                    {this.props.member.id}
                </td>
                <td>
                    {this.props.member.login}
                </td>
            </tr>
        )
    }
}