import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons'
import { Folder } from 'src/app/data/folder'
import { SettingsService } from 'src/app/services/settings.service'
import { EditDialogMode } from '../edit-dialog.component'
import { FolderEditDialogComponent } from './folder-edit-dialog.component'

describe('FolderEditDialogComponent', () => {
  let component: FolderEditDialogComponent
  let fixture: ComponentFixture<FolderEditDialogComponent>

  const folders: Folder[] = [
    {
      id: 1,
      name: 'Inbox',
      parent: null,
      children: [{ id: 2, name: 'Taxes', parent: 1, children: [] }],
    },
    { id: 3, name: 'Work', parent: null, children: [] },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgbModule,
        NgxBootstrapIconsModule.pick(allIcons),
        FolderEditDialogComponent,
      ],
      providers: [
        NgbActiveModal,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(FolderEditDialogComponent)
    component = fixture.componentInstance
    TestBed.inject(SettingsService).currentUser.set({
      id: 99,
      username: 'user99',
    })
  })

  it('initializes edit mode with the folder values', () => {
    component.object = folders[0]
    component.dialogMode.set(EditDialogMode.EDIT)
    component.folders = folders

    fixture.detectChanges()

    expect(component.getTitle()).toBe('Edit folder')
    expect(component.objectForm.value.name).toBe('Inbox')
    expect(component.objectForm.value.parent).toBeNull()
    expect(component.parentOptions.map((folder) => folder.id)).toEqual([3])
  })
})
