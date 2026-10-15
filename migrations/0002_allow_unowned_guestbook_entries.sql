-- Some 2023 entries have no recoverable author. They stay visible, but no
-- account can delete them from the site.
alter table guestbook drop constraint guestbook_has_owner;
