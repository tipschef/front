import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WebsocketService} from '../../../shared/services/websocket/websocket.service';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Discussion} from '../../../shared/models/discussion';
import {UserService} from '../../../shared/services/user/user.service';
import {TipschefMessage} from '../../../shared/models/tipschef-message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  messages: TipschefMessage[];
  msgControl = new FormControl('');
  destroyed$ = new Subject();
  discussions: Discussion[];
  currentInterlocutor: Discussion;

  form: FormGroup;

  constructor(private chatService: WebsocketService,
              private authService: AuthService,
              private userService: UserService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    const chatSub$ = this.chatService.connect(this.authService.userRoles.id).pipe(
      takeUntil(this.destroyed$),
    );

    chatSub$.subscribe(
      message => {
        const tipschefMessage = JSON.parse(message.data) as TipschefMessage;
        this.messages.push(tipschefMessage);
        this.updateSeen(tipschefMessage);
        this.scrollToBottom();
      });

    this.form = this.formBuilder.group({
      text: ['']
    });
    this.loadDiscussion();
  }

  updateSeen(message: TipschefMessage): void {
    for (const discussion of this.discussions) {
      if (message.sender_id === discussion.interlocutor_id) {
        discussion.seen = false;
        return;
      }
    }
    this.loadDiscussion();
  }

  sendMessage(): void {
    if (this.form.value.text.length !== 0) {
      const messageToSend: TipschefMessage = {
        receiver_id: this.currentInterlocutor.interlocutor_id,
        sender_id: this.authService.userRoles.id,
        content: this.form.value.text,
      };
      this.chatService.send(JSON.stringify(messageToSend));
      this.form.controls.text.setValue('');
    }
  }

  loadDiscussion(): void {
    this.userService.getDiscussions().subscribe(httpReturn => {
      if (httpReturn?.body) {
        this.discussions = httpReturn.body;
        if (this.discussions.length !== 0) {
          for (const discussion of this.discussions) {
            discussion.seen = discussion.last_read_date >= discussion.last_message_date;
          }
          this.currentInterlocutor = this.discussions[0];
          this.discussions[0].seen = true;
          this.loadMessage();
        }
      }
    });
  }

  loadMessage(): void {
    this.userService.getMessages(this.currentInterlocutor.discussion_id).subscribe(httpReturn => {
      if (httpReturn?.body) {
        this.messages = httpReturn.body;
        this.scrollToBottom();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  updateInterlocuteur(discussion: Discussion): void {
    this.currentInterlocutor = discussion;
    this.currentInterlocutor.seen = true;
    this.loadMessage();
  }

  get currUsername(): string {
    return this.authService.userRoles.username;
  }

  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

}
