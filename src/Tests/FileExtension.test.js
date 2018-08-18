import FileExtension from '../Utils/FileExtension';

it('returns png image extension if source provided ends with png',() =>
  expect(FileExtension('my_picture_url.png')).toBe('png')
);

it('returns mp4 video extension if source provided ends with mp4',() =>
  expect(FileExtension('my_video_url.mp4')).toBe('mp4')
);