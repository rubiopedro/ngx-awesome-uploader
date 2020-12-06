import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { FilePickerAdapter, UploadResponse, UploadStatus } from '../../file-picker.adapter';
import { FilePickerService } from '../../file-picker.service';
import { FilePreviewModel } from '../../file-preview.model';
import { createMockPreviewFile } from '../../test-utils';
import { FilePreviewItemComponent } from './file-preview-item.component';

class MockUploaderAdapter extends FilePickerAdapter {
    public uploadFile(fileItem: FilePreviewModel): Observable<UploadResponse> {
     return of({body: 50, status: UploadStatus.UPLOADED});
    }
      public removeFile(fileItem: FilePreviewModel) {
        return of('ok');
    }
  }

describe('FilePreviewComponent', () => {
  let component: FilePreviewItemComponent;
  let fixture: ComponentFixture<FilePreviewItemComponent>;
  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        FilePreviewItemComponent
      ],
      providers: [FilePickerService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePreviewItemComponent);
    component = fixture.componentInstance;
    component.fileItem = createMockPreviewFile('test.png', 'image/', 10);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should itemTemplate be undefined by default', () => {
      expect(component.itemTemplate).toBeUndefined();
  });

  it('should captions be undefined by default', () => {
      expect(component.captions).toBeUndefined();
  });

  it('should adapter be undefined by default', () => {
      expect(component.adapter).toBeUndefined();
  });

  it('should enableAutoUpload be undefined by default', () => {
      expect(component.enableAutoUpload).toBeUndefined();
  });

  it('should uploadProgress be undefined by default', () => {
      expect(component.uploadProgress).toBeUndefined();
  });
  it('should fileType be undefined by default', () => {
      expect(component.fileType).toBeUndefined();
  });

  it('should safeUrl be undefined by default', () => {
      expect(component.safeUrl).toBeUndefined();
  });

  it('should uploadError be undefined by default', () => {
    expect(component.uploadError).toBeUndefined();
   });

  it('should uploadResponse be undefined by default', () => {
        expect(component.uploadResponse).toBeUndefined();
    });

  fdescribe('#ngOnInit', () => {

    it('should safeUrl be defined', () => {
        component.ngOnInit();
        expect(component.safeUrl).toBeDefined();
    });

    it('should fileType be defined', () => {
        component.ngOnInit();
        expect(component.fileType).toEqual('image');
    });

    describe('and uploadFile', () => {
        describe('and enableAutoUpload is true', () => {
            beforeEach(() => {
                component.enableAutoUpload = true;
            });

            describe('and adapter exist', () => {
                beforeEach(() => {
                    component.adapter = new MockUploaderAdapter();
                    spyOn(component.adapter, 'uploadFile').and.returnValue(of({body: 10, status: UploadStatus.UPLOADED}));
                });
                it('should upload file', () => {
                    component.ngOnInit();
                    expect(component.adapter.uploadFile).toHaveBeenCalled();
                });

            });
        });

        describe('and enableAutoUpload is false', () => {
            beforeEach(() => {
                component.enableAutoUpload = false;
            });

            describe('and adapter exist', () => {
                beforeEach(() => {
                    component.adapter = new MockUploaderAdapter();
                    spyOn(component.adapter, 'uploadFile').and.returnValue(of(5));
                });
                it('should NOT upload file', () => {
                    component.ngOnInit();
                    expect(component.adapter.uploadFile).not.toHaveBeenCalled();
                });
            });
    });
      });
  });

});
