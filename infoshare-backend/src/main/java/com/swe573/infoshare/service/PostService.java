package com.swe573.infoshare.service;

import org.springframework.stereotype.Service;

import com.swe573.infoshare.model.Community;
import com.swe573.infoshare.model.Post;
import com.swe573.infoshare.model.PostTemplate;
import com.swe573.infoshare.model.User;
import com.swe573.infoshare.repository.CommunityRepository;
import com.swe573.infoshare.repository.PostRepository;
import com.swe573.infoshare.repository.PostTemplateRepository;
import com.swe573.infoshare.request.post.NewPostRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final CommunityRepository communityRepository;
    private final PostTemplateRepository postTemplateRepository;

    public void submitNewPost(User user, NewPostRequest request) {

        Community community = communityRepository.getReferenceById(request.getCommunityId());
        Post newPost = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .community(community)
                .createdBy(user)
                .build();

        if (request.getPostTemplateId() != null) {

            PostTemplate postTemplate = postTemplateRepository.getReferenceById(request.getPostTemplateId());

            newPost.setPostTemplate(postTemplate);

        }

        postRepository.save(newPost);
    }
}
